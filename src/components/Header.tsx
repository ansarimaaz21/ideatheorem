import HeaderIcon from '../assets/icon-lg.svg'

const Header = () => {
    return (
        <div className="bg-base">
            <div className="pl-4 sm:pl-40 py-3">
                <img className='h-4 w-36 sm:h-8 sm:w-72' src={HeaderIcon} alt="icon" />
            </div>
        </div>
    )
}

export default Header
