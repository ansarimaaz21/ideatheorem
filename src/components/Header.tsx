import HeaderIcon from '../assets/icon-lg.svg'

const Header = () => {
    return (
        <div className="bg-base">
            <div className="pl-40 py-3">
                <img className='h-8 w-72' src={HeaderIcon} alt="icon" />
            </div>
        </div>
    )
}

export default Header
