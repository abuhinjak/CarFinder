import { Link, useNavigate } from 'react-router-dom';

const MakeCard = ({ make, view }) => {
    const navigate = useNavigate();

    return (
        <Link to={`/makes/${make.id}`} className="make-card-link">
            <div className="make-card">
                <img src={make.image} alt={make.name}/>
                <div className="make-info-wrapper">
                    <div className="make-logo">
                        <img src={make.logo} alt={make.name} />
                    </div>
                    <div className="make-name">
                        <h3>{make.name}</h3>
                        {
                            view === 'list' && <p>{make.desc}</p>
                        }
                        <button onClick={() => navigate(`/makes/${make.id}`)} className='btn secondary-btn'>View</button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MakeCard;
