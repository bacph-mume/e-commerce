import Menu from "@/app/components/category/Menu";

export default function CategoryLayout({ children }) {
  return (
    <div className="flex p-12 justify-between items-start bg-gray-100">
      <Menu />
      {children}
    </div>
  );
}
