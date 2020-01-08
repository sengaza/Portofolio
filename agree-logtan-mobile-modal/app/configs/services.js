import { Authorization } from 'react-native-dotenv';
import { get, post, put } from './networking';

// end point
export const endpoint = {
  createFarmerMandiri: async params => post(`/api/agree-modal/farmers/v1/mandiri`, params),
  updateFarmerMandiri: async (id, params) => put(`/api/agree-modal/farmers/v1/mandiri/${id}`, params),
  createLand: async params => post(`/api/agree-modal/planting-seasons/v1/mandiri`, params),
  createPreScreening: async params => post(`/api/agree-modal/loans/v1/mandiri/prescreening`, params),
  updateLandMandiri: async (id, params) => put(`/api/agree-modal/planting-seasons/v1/mandiri/${id}`, params),
  getFarmerList: async () => get(`/api/agree-modal/farmers/v1?isDeleted=false`),
  getMandiriFarmerById: async id => get(`/api/agree-modal/farmers/v1/mandiri/${id}`),
  // getFarmerById: async id => get(`/api/agree-modal/farmers/v1/${id}`),
  getMandiriFarmerDetailById: async id => get(`/api/agree-modal/farmers/v1/mandiri-detail/${id}`),
  login: async params => post(`/api/agree-modal/auth0/v1/login`, params, { Authorization }),
  getHome: async () => get(`/api/agree-modal/farmers/v1/home`),
  getLandList: async (id, isActive) =>
    get(
      `/api/agree-modal/planting-seasons/v1/farmer/${id}?isDeleted=false&plantingSeasonIsActive=${isActive}`
    ),
  getLandDetailById: async id => get(`/api/agree-modal/planting-seasons/v1/mandiri/${id}`),
  getCommodity: async () => get(`/api/agree-modal/commodities/v1`),
  getVariety: async () => get(`/api/agree-modal/varieties/v1`),
  getProvince: async () => get(`/api/agree-modal/zone/provinces/v1`),
  getDistrictByProvinceId: async id => get(`/api/agree-modal/zone/districts/v1/province/${id}`),
  getSubDistrictByDistrictId: async id => get(`/api/agree-modal/zone/subDistricts/v1/district/${id}`),
  getVillageBySubDistrictId: async id => get(`/api/agree-modal/zone/villages/v1/subDistrict/${id}`),
  getLoanByFarmerId: async id => get(`/api/agree-modal/loans/v1/${id}`),
  submitLoan: async params => post(`/api/agree-modal/loans/v1/mandiri/detail-loan`, params),
  getLoanList: async () => get(`/api/agree-modal/loans/v1/mobile`)
};

export default { endpoint };
