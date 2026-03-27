export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 30C20 24.4772 24.4772 20 30 20H70C75.5228 20 80 24.4772 80 30V60C80 65.5228 75.5228 70 70 70H45L25 85V70C22 70 20 68 20 65V30Z" className="fill-blue-600" />
            <circle cx="40" cy="45" r="5" fill="white" />
            <circle cx="60" cy="45" r="5" fill="white" />
            <path d="M40 45H60" stroke="white" strokeWidth="2" />
        </svg>
    );
}