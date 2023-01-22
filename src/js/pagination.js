import Pagination from 'tui-pagination';
const container = document.getElementById('tui-pagination-container');
const options = {
  totalItems: 500,
  itemsPerPage: 20,
  visiblePages: 5,
  usageStatistics: false,
    centerAlign:true,
};

const instance = new Pagination(container, options);
instance.getCurrentPage();

  