'use client';
import { motion } from 'framer-motion';
import { PortfolioItem } from '@/lib/types';

export default function PortfolioSection({ items }: { items: PortfolioItem[] }) {
  if (!items || items.length === 0) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-semibold mb-8 text-primary">Portfolio</h3>
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((portfolio) => (
          <motion.div 
            key={portfolio.id}
            variants={itemVariants}
            className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-shadow flex flex-col"
          >
            {portfolio.imageUrl && (
              <div className="w-full aspect-video relative">
                <img 
                  src={portfolio.imageUrl} 
                  alt={portfolio.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-base text-primary">{portfolio.title}</h4>
                {portfolio.year && (
                  <span className="text-xs bg-gray-100 rounded-full px-2 py-0.5 text-secondary whitespace-nowrap ml-2">
                    {portfolio.year}
                  </span>
                )}
              </div>
              <p className="text-sm text-secondary line-clamp-2 mb-4 flex-grow">
                {portfolio.description}
              </p>
              {portfolio.projectUrl && (
                <a 
                  href={portfolio.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-accent font-medium mt-auto inline-block hover:underline"
                >
                  View Project &rarr;
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
