import Image from 'next/image';
import TeamMemberInteractive from './TeamMemberInteractive';

const teamMembers = [
  {
    name: 'Shukhratbek Mamadaliev',
    role: 'Team Lead/Full-stack',
    imageUrl: '/team/shukhratbek.jpg',
  },
  { name: 'Allayar Jandullaev', role: 'Business analyst', imageUrl: '/team/allayar.jpg' },
  { name: 'Leyla Baxridinova', role: 'Automation Tester', imageUrl: '/team/leyla.jpg' },
  { name: 'Yodgorjon Yuldoshev', role: 'Web Developer', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Diyorbek Safarboev', role: 'UI/UX Designer', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Abror Orifxonov', role: 'UI/UX Designer', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Khumoyun Izzatov', role: 'Web Developer', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Sanjar Pulatov', role: 'Web Developer', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Oybek Tulaboev', role: 'Manual Tester', imageUrl: '/team/deadpool-pro.jpg' },
];

function TeamMemberCard({ member, index }: { member: { name: string; role: string; imageUrl: string }; index: number }) {
  return (
    <li>
      <TeamMemberInteractive>
        <div className="flex flex-col items-center p-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 md:mb-4 relative rounded-full overflow-hidden">
            <Image
              src={member.imageUrl}
              alt={`${member.name}, ${member.role}`}
              fill
              sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
              className="object-cover"
              priority={index < 4}
              loading={index >= 4 ? 'lazy' : undefined}
            />
          </div>
          <h3 className="text-xs sm:text-sm font-medium text-center">
            {member.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            {member.role}
          </p>
        </div>
      </TeamMemberInteractive>
    </li>
  );
}

export default function TeamSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Meet our team
        </h2>
        <p className="text-gray-600 text-center mb-8 sm:mb-12">
          The people behind the product
        </p>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={member.name} 
              member={member}
              index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
