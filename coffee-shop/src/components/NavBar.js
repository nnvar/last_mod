import Link from 'next/link';
import { FaShoppingCart, FaBars } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.menuIcon}>
         <Link href="/menu">
          <FaBars size={24} />
        </Link>
      </div>
      <div style={styles.title}>
        <Link href="/">
          Coffee Shop
        </Link>
      </div>
      <div style={styles.cartIcon}>
        <Link href="/cart">
          <FaShoppingCart size={24} />
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    //position: 'fixed',
    //top: 0,
    //width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'green',
    color: 'white',
    //zIndex: 1000, // Ensure the navbar stays above other content
  },
  menuIcon: {
    flex: 1,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: '24px',
  },
  cartIcon: {
    flex: 1,
    textAlign: 'right',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  }
};

export default NavBar;
