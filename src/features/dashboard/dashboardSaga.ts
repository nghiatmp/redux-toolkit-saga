import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import cityApi from "api/cityApi";
import studentApi from "api/studentApi";
import { City, ListResponse, Student } from "models";
import { dashboardActions, RankingByCity } from "./dashboardSlice";

function * fetchStatistics() {
  const reponseList:Array<ListResponse<Student>> =  yield all([
    call(studentApi.getAll, {_page: 1, _limit: 5, gender: 'male'}),
    call(studentApi.getAll, {_page: 1, _limit: 5, gender: 'female'}),
    call(studentApi.getAll, {_page: 1, _limit: 5, mark_gte: 8}),
    call(studentApi.getAll, {_page: 1, _limit: 5, mark_gte: 5}),
  ]);

  const statisticsList = reponseList.map(x => x.pagination._totalRows);
  
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;

  yield put(dashboardActions.setStatistic({maleCount, femaleCount, highMarkCount, lowMarkCount}));

};

function * fetchHeighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order :'desc',
  });

  yield put(dashboardActions.setHighestStudentList(data));  
};

function * fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order :'asc',
  });

  yield put(dashboardActions.setLowestStudentList(data));
};

function * fetchRankingByCityList() {
  const {data: cityList}: ListResponse<City> = yield call(cityApi.getAll);

  const callList = cityList.map(city => call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order :'asc',
    city: city.code
  }));

  const responseList:Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = responseList.map((item, index) => ({
    cityId: cityList[index].code,
    rankingList: item.data
  }));
  
  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
  
};

function * fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHeighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);

    yield put(dashboardActions.fetchDataSuccess())
  } catch(error) {
    console.log('error' , error);
  }
}

export default function * dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}