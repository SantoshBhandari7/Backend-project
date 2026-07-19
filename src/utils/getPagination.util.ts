import Brand from "../models/brand.models";
export const getPagination = async(
  total_count: number,
  perPage: number,
  currentPage: number,
)=>{

  const total_page = Math.ceil(total_count / perPage);
  const next_page = currentPage < total_page ? currentPage + 1 : null;
  const prev_page = currentPage > 1 ? currentPage - 1 : null;

  return {
    total_count,
    total_page,
    next_page,
    prev_page,
   page:currentPage,
   limit:perPage,
  };
};
