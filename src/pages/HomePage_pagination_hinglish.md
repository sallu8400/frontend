# HomePage.jsx me Pagination kaise add kiya gaya hai (Hinglish Explanation)

## 1. Redux Slice Import
Sabse pehle, pagination ke liye Redux slice ka action import kiya:
```js
import { fetchPaginatedProducts } from '../store/slices/paginationSlice';
```

## 2. Local State for Page
Ek local state banayi jisme current page store hota hai:
```js
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 6; // Har page par kitne products dikhane hain
```

## 3. Redux State se Data Lena
Redux ke useSelector se pagination slice ka data, loading, error, total items liye:
```js
const { data: currentProducts, loading, error, total } = useSelector((state) => state.pagination);
```

## 4. useEffect me Data Fetch
Jab bhi currentPage change hota hai, useEffect ke andar paginated products fetch kiye:
```js
useEffect(() => {
  dispatch(fetchPaginatedProducts({ page: currentPage, limit: productsPerPage }));
  dispatch(getWishlist());
}, [dispatch, currentPage]);
```

## 5. Pagination Component
Ant Design ka Pagination component use kiya, jisme current page, page size, total items diye:
```js
<Pagination
  current={currentPage}
  pageSize={productsPerPage}
  total={total}
  onChange={onPageChange}
  className="pagination-style"
/>
```

## 6. Page Change Handler
Jab user page change karta hai, setCurrentPage se page update hota hai:
```js
const onPageChange = (page) => {
  setCurrentPage(page);
};
```

## 7. Products Grid
currentProducts ko map karke ProductCard dikhaya:
```js
{currentProducts.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
```

## Summary
- Redux slice se paginated products fetch kiye
- Local state me current page rakha
- Pagination component se page change handle kiya
- Products grid me sirf current page ke products dikhaye

Is tarah se HomePage.jsx me pagination implement kiya gaya hai, jo scalable aur user-friendly hai.
