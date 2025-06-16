import { useTransition, animated } from '@react-spring/web';
import { useLocation } from 'react-router-dom';

export const PageTransition = ({ children }) => {
  const location = useLocation();
  
  const transitions = useTransition(location, {
    keys: location.pathname,
    from: { 
      opacity: 0,
      transform: 'translateY(20px)'
    },
    enter: { 
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: { 
      opacity: 0,
      transform: 'translateY(-20px)'
    },
    config: {
      duration: 250
    }
  });

  return transitions((style) => (
    <animated.div 
      style={{
        position: 'relative', 
        width: '100%',
        ...style
      }}
    >
      {children}
    </animated.div>
  ));
};