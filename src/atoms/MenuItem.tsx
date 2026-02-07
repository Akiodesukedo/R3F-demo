import { useNavigate } from "react-router-dom"

type MenuItemProps = {
  itemName: string,
  pagePath: string,
  closeMenu: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ itemName, pagePath, closeMenu }) => {

  const navigate = useNavigate();
    
  const moveToPage = () => {
    navigate(pagePath)
    closeMenu()
    
  }

  return (
    <button 
      className="border-b border-b-black m-x-30 h-[100px] cursor-pointer hover:bg-black duration-200 ease-in text-black text-[26px] hover:text-white"
      onClick={moveToPage}
    >
      { itemName }
    </button>
  )
}


export default MenuItem
