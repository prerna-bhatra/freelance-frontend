const FeatureItem = ({  key , icon, text }) => {
    return (
        <div key={key} className='px-3 py-3  flex items-center gap-x-6 border-[#d9d6d6]'>
            {icon}
            <p className='text-[#44475B]'>{text}</p>
        </div>
    );
};

export default FeatureItem