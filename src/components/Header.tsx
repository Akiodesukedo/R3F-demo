import { useNavigate } from "react-router-dom"

type HeaderProps = {
  absolute?: boolean
  openMenu: () => void
}

const Header: React.FC<HeaderProps> = ({ absolute = false, openMenu }) => {
  const navigate = useNavigate()

  return (
    <div 
      className={`w-full flex flex-nowrap justify-between items-center p-5 md:p-10 z-30 ${absolute ? 'sticky top-0 left-0' : 'relative'}`}
    >
      <h1 onClick={() => navigate('/')}>
        Back to basic
      </h1>
      <img 
        src="/images/mobile_nav.webp"
        alt="menu button"
        className="w-[50px]"
        onClick={openMenu}
      />
    </div>
  )
}

export default Header