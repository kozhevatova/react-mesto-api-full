const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; <span id="year">{new Date().getFullYear()}</span> Mesto Russia</p>
        </footer>
    );
}

export default Footer;