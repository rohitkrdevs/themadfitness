import React from 'react';

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/919572727348"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7 md:w-8 md:h-8"
      >
        <path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.12.548 4.195 1.591 6.015L.031 24l6.115-1.603A11.956 11.956 0 0012.031 24c6.637 0 12.031-5.394 12.031-12.031S18.668 0 12.031 0zM17.432 17.067c-.255.723-1.488 1.385-2.072 1.458-.537.067-1.229.135-3.876-.96-3.2-1.325-5.263-4.636-5.421-4.848-.158-.211-1.293-1.722-1.293-3.284 0-1.562.812-2.333 1.1-2.637.288-.304.629-.381.838-.381.21 0 .42.001.604.01.196.01.46-.076.719.55.275.666.942 2.302 1.027 2.474.084.172.141.372.036.584-.105.211-.158.344-.316.531-.158.186-.334.41-.475.545-.157.147-.323.308-.145.615.178.307.791 1.308 1.698 2.115 1.173 1.044 2.158 1.369 2.473 1.517.315.148.498.121.684-.092.186-.211.79-1.025 1.002-1.375.211-.351.423-.292.712-.186.289.105 1.832.862 2.146 1.02.315.158.525.237.604.368.079.131.079.76-.176 1.483z" />
      </svg>
      
      {/* Tooltip popping out to the left */}
      <span className="absolute right-full mr-4 bg-surface-container-highest text-on-surface text-[10px] md:text-xs font-mono font-bold px-3 py-1.5 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-outline/20 shadow-xl hidden sm:block">
        CHAT WITH THE COACH
      </span>
    </a>
  );
}
