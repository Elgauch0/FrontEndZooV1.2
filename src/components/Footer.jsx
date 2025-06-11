const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-100 mt-auto border-t border-green-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Section Logo et description */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-4">Arcadia Zoo</h2>
            <p className="text-sm text-green-100 leading-relaxed">
              Sanctuaire naturel dédié à la préservation de la biodiversité
              et à l'éducation environnementale.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-4">Explorer</h3>
            <ul className="space-y-2">
              {[
                { name: 'Horaires', link: '/horaire' },
                { name: 'Services', link: '/services' },
                { name: 'Habitats', link: '/habitats' },
                { name: 'Contact', link: '/contact' },

              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="text-green-100 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section légale */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-4">Légal</h3>
            <ul className="space-y-2">
              {['Confidentialité', 'Conditions d\'utilisation', 'FAQ', 'Accessibilité'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-green-100 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Nous trouver</h3>
            <div className="space-y-2 text-sm">
              <p className="text-green-100">123 Rue de la Nature</p>
              <p className="text-green-100">94310, Orly France</p>
              <p className="text-green-100">+33 7 83 74 92 07</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-green-800" />

        {/* Bas de footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-xs text-green-400 text-center">
            &copy; {new Date().getFullYear()} El Kaouri :: - Tous droits réservés
          </p>

          {/* Réseaux sociaux */}
          <div className="flex space-x-4">
            {['facebook', 'twitter', 'instagram', 'youtube'].map((network) => (
              <a
                key={network}
                href="#"
                className="text-green-300 hover:text-white transition-colors"
                aria-label={`Suivez-nous sur ${network}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {/* Icônes SVG simplifiées */}
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;