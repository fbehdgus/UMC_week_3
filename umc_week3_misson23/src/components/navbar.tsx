import {Link, NavLink} from "react-router-dom";



const LINKS=[
    {to: '/', name: '홈'},
    {to: '/movies/popular', name: '인기영화'},
    {to: '/movies/now_playing', name: '상영중'},
    {to: '/movies/top_rated', name: '평점높은'},
    {to: '/movies/upcoming', name: '개봉예정'},
]

const Navbar = () => {
    return (
        <div className='flex gap-3 p-4'>
            {LINKS.map(({to, name})=>(
                <NavLink
                    key={to}
                    to={to}
                    className={({isActive})=>
                    isActive ? 'text-blue-500 font-bold' : 'text-gray-500'}
                >
                {name}

                </NavLink>

            ))}

        </div>
    );
};

export default Navbar;