

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">Arcadia Zoo</p>
        <p className="mt-2 text-sm">
          &copy; {new Date().getFullYear()} Arcadia Zoo. Tous droits réservés.
        </p>
        <p className="text-xs mt-1">
          Conçu avec ❤️ pour la protection des animaux.
        </p>
      </div>
    </footer>
  );
};

export default Footer;