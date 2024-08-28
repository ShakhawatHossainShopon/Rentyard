export const Map = () => {
  return (
    <div className="w-full px-4" id="map">
      <h2 className="md:text-2xl font-semibold py-5 text-xl">Map</h2>
      <div className="h-[50vh] bg-gray-300">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="map"
          scrolling="no"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429176.9099725442!2d-97.06120626642132!3d32.82023258977765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19f77b45974b%3A0xb9ec9ba4f647678f!2sDallas%2C%20TX%2C%20USA!5e0!3m2!1sen!2sbd!4v1719946102028!5m2!1sen!2sbd"
        ></iframe>
      </div>
    </div>
  );
};
