import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const MakeCard = ({ make, view }) => {
    const navigate = useNavigate();

    return (
        <Link to={`/makes/${make.id}`} className="make-card-link">
            <div className="make-card">
                <img src={make.image} alt={make.name}/>
                <div className="make-info-wrapper">
                    {
                        make.logo && (
                            <div className="make-logo">
                                <img src={make.logo} alt={make.name} />
                            </div>
                        )
                    }
                    <div className="make-name">
                        <h3>{make.name}</h3>
                        {
                            view === 'list' && <p>{make.desc}</p>
                        }
                        <button onClick={() => navigate(`/makes/${make.id}`)} className='btn outline-btn'>Check Models</button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

MakeCard.propTypes = {
    make: PropTypes.shape({
        id: PropTypes.string,
        image: PropTypes.string.isRequired,
        logo: PropTypes.string,
        name: PropTypes.string.isRequired,
        desc: PropTypes.string
    }).isRequired,
    view: PropTypes.string.isRequired
};

export default MakeCard;
