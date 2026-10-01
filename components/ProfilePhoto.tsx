import Image from 'next/image';

interface ProfilePhotoProps {
  url: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProfilePhoto({ url, name, size = 'md' }: ProfilePhotoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : '?';

  return (
    <div className={`${sizeClasses[size]} rounded-full border border-gray-200 shadow-sm overflow-hidden flex items-center justify-center bg-gray-50 flex-shrink-0 relative`}>
      {url ? (
        <Image src={url} alt={name} fill className="object-cover" unoptimized />
      ) : (
        <span className="text-gray-500 font-medium text-sm">{initials}</span>
      )}
    </div>
  );
}
