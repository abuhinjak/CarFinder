import { Link, useNavigate } from 'react-router-dom';

const ModelCard = ({ view, model }) => {
    const navigate = useNavigate();

    return (
        <Link to={`/model/${model.id}`} className="make-card-link">
            <div className="make-card">
                <img src={model.image} alt={model.name}/>
                <div className="make-info-wrapper">
                    <div className="make-logo">
                    </div>
                    <div className="make-name">
                        <h3>{model.name}</h3>
                        {
                            view === 'list' && <p>{model.desc}</p>
                        }
                        <button onClick={() => navigate(`/model/${model.id}`)} className='btn outline-btn'>Learn more</button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ModelCard;