import PropTypes from 'prop-types';

const FormContainer = ({ open, children }) => {
    return (
      <div className={`form-container ${open ? 'show' : 'hide'}`} >
        {children}
      </div>
    );
  };

  FormContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    children: PropTypes.node
  };
  
  
  export default FormContainer;
  