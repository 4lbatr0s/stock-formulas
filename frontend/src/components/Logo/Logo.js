// material-ui

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //
import zuufin from '../../assets/images/icons/logo/zuufin.svg'

const Logo = () => {
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     *
     *
     */
    <>
      <img src={zuufin} alt="Mantis" width="80" />
    </>
  );
};

export default Logo;
