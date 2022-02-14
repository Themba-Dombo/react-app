import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {
    return (<button 
        style={{backgroundColor:color}} 
        className='btn'
        onClick={onClick}
        id='green-button'
        >
            {text}
        </button>)
  }

Button.defaultProps = {
    color: 'steelBlue'
}

Button.prototype = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}
export default Button