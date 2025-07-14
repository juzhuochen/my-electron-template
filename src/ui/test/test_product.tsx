import React from "react";
import { JSX } from "react";
interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface ProductCategoryRowProps {
  category: string;
}
interface ProductRowProps {
  product: Product;
}
interface ProductTableProps {
  products: Product[];
  filterText: string;
  isStockOnly: boolean;
}
interface SearchBarProps {
  filterText: string;
  isStockOnly: boolean;
  onFilterTextChange: (filterText: string) => void;
  onStockOnlyChange: (isStockOnly: boolean) => void;
}
interface FilterableProductTableProps {
  products: Product[];
}

function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  return (
    <tr>
      <th colSpan={2} style={{ backgroundColor: '#eee' }}>
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }: ProductRowProps) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, isStockOnly }: ProductTableProps) {
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if (product.name.toLocaleLowerCase().indexOf(
      filterText.toLocaleLowerCase()

    ) === -1) {
      return;
    }
    if (isStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, isStockOnly, onFilterTextChange, onStockOnlyChange }: SearchBarProps) {
  return (
    <form>
      <input
        type="text" 
        value={filterText}
        placeholder="Search..." 
        onChange={
        (e) => {
          onFilterTextChange(e.target.value);
        }
      } />
      <label>
        <input 
        type="checkbox" 
        checked={isStockOnly}
        onChange={
          (e)=> {
            onStockOnlyChange(e.target.checked)  ;
          }
        }
        />

        {' '}
        Only show products in stock
      
      </label>
    </form>
  );
}

function FilterableProductTable({ products }: FilterableProductTableProps) {
  const [filterText, setFilterText] = React.useState('');
  const [isStockOnly, setIsStockOnly] = React.useState(false);
  return (
    <div>
      <SearchBar
        filterText={filterText}
        isStockOnly={isStockOnly}
        onFilterTextChange={setFilterText}
        onStockOnlyChange={setIsStockOnly}
      />
      <ProductTable products={products}
        filterText={filterText}
        isStockOnly={isStockOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
