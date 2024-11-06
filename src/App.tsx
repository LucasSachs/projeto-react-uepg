import { PageTitle } from "./Components/PageTitle";
import { ProductList } from "./Components/ProductList";

export default function App() {
  return (
    <div className="flex justify-center h-screen py-8">
      <div className="w-[800px] flex flex-col gap-8">
        <PageTitle />
        <ProductList />
      </div>
    </div>
  )
}
