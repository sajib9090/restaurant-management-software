import { baseApi } from "../api/baseApi";

const soldInvoiceApi = baseApi.injectEndpoints({
  tagTypes: ["SoldInvoice"],
  endpoints: (builder) => ({
    // getAllMenuItems: builder.query({
    //   query: ({
    //     searchValue = "",
    //     pageValue = "",
    //     limitValue,
    //     categoryValue = "",
    //     priceFilterValue = "",
    //   } = {}) => {
    //     let queryString = `/menu-items/get-all?search=${searchValue}`;
    //     if (pageValue) {
    //       queryString += `&page=${pageValue}`;
    //     }
    //     if (limitValue) {
    //       queryString += `&limit=${limitValue}`;
    //     }
    //     if (limitValue) {
    //       queryString += `&limit=${limitValue}`;
    //     }
    //     if (categoryValue) {
    //       queryString += `&category=${categoryValue}`;
    //     }
    //     if (priceFilterValue) {
    //       queryString += `&price=${priceFilterValue}`;
    //     }
    //     return {
    //       url: queryString,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["MenuItem"],
    // }),
    getSingleInvoiceById: builder.query({
      query: ({ invoice_id = "" }) => ({
        url: `/sold-invoices/get-sold-invoice/${invoice_id}`,
        method: "GET",
      }),
      providesTags: (result, error, { invoice_id }) => [
        { type: "SoldInvoice", id: invoice_id },
      ],
    }),
    addSoldInvoice: builder.mutation({
      query: (data) => ({
        url: "/sold-invoices/add-sold-invoice",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SoldInvoice"],
    }),
    // deleteMenuItem: builder.mutation({
    //   query: (ids) => ({
    //     url: `/menu-items/delete-menu-item`,
    //     method: "DELETE",
    //     body: ids,
    //   }),
    //   invalidatesTags: ["MenuItem"],
    // }),
    // updateMenuItem: builder.mutation({
    //   query: ({ id, ...data }) => ({
    //     url: `/menu-items/update-menu-item/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["MenuItem"],
    // }),
  }),
});

export const {
  //   useGetAllMenuItemsQuery,
  useAddSoldInvoiceMutation,
  useGetSingleInvoiceByIdQuery,
  //   useDeleteMenuItemMutation,
  //   useUpdateMenuItemMutation,
} = soldInvoiceApi;
