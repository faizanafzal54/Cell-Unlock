const activeArtisanList = (state) => state?.artisan?.activeArtisanList
const pendingArtisanList = (state) => state?.artisan?.pendingArtisanList
const inActiveArtisanList = (state) => state?.artisan?.inActiveArtisanList
const page = (state) => state?.artisan?.page
const limit = (state) => state?.artisan?.limit
const totalRecords = (state) => state?.artisan?.totalRecords

const artisanSelector = {
  activeArtisanList,
  pendingArtisanList,
  inActiveArtisanList,
  page,
  limit,
  totalRecords,
}

export default artisanSelector
