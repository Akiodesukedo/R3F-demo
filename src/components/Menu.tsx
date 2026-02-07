import MenuItem from "../atoms/MenuItem"

type MenuProps = {
  isOpen: boolean,
  closeMenu: () => void
}

const Menu: React.FC<MenuProps> = ({ isOpen, closeMenu }) => {
  
  return (
    <div
      className={
        `fixed top-0 right-0 h-full w-full bg-white transform transition-transform duration-300 z-50 flex flex-col flex-nowrap p-[30px]
        ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`
      }
      onClick={closeMenu}
    >
      <button onClick={closeMenu}>
        <p className="text-right text-black text-[30px] cursor-pointer">
          ×
        </p>
      </button>
      <MenuItem itemName="Basic" pagePath="/" closeMenu={closeMenu}/>
      <MenuItem itemName="Room" pagePath="/room" closeMenu={closeMenu} />
      {/* <MenuItem itemName="About" pagePath="/about" closeMenu={closeMenu}/> */}
      {/* <MenuItem itemName="Test" pagePath="/test" closeMenu={closeMenu}/> */}
    </div>
  )
}


export default Menu
