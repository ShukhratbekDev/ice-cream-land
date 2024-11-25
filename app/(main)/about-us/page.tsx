import React from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Shukhratbek Mamadaliev',
    role: 'Team Lead/Full-stack',
    imageUrl: '/team/deadpool-pro.jpg',
  },
  { name: 'Allayar Jandullaev', role: 'Business analyst', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Leyla Baxridinova', role: 'Automation Tester', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Yodgorjon Yuldoshev', role: 'Web Developer', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Diyorbek Safarboev', role: 'UI/UX Designer', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Abror Orifxonov', role: 'UI/UX Designer', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Khumoyun Izzatov', role: 'Web Developer', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Sanjar Pulatov', role: 'Web Developer', imageUrl: '/team/deadpool-pro.jpg' },
  { name: 'Oybek Tulaboev', role: 'Manual Tester', imageUrl: '/team/deadpool-pro.jpg' },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-2">Meet our team</h2>
          <p className="text-gray-600 text-center mb-12">The people behind the product</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 96px) 100vw, 96px"
                    className="object-cover"
                    priority={index < 4}
                  />
                </div>
                <h3 className="text-sm font-medium text-center">{member.name}</h3>
                <p className="text-sm text-gray-500 text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative aspect-video">
              <Image
                src="/catering.jpg"
                alt="Ice Cream Store"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg shadow-lg object-cover"
                priority
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-gray-600 mb-2">The power to do more</h3>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Ice Cream Land began as a small family-run business with a passion for creating delicious and unique ice
                cream flavors. Founded in 2010 in the heart of Dessert City, we quickly gained a loyal following for our
                artisanal approach to ice cream making. Our journey has been fueled by a love for quality ingredients,
                innovative flavors, and a commitment to bringing joy to every scoop.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8">Results in numbers</h2>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <p className="text-gray-700 mb-6">
                Ice Cream Land, our mission is to create the finest ice cream that brings happiness to our customers. We
                believe in using only the highest quality ingredients, sourced responsibly and sustainably.
              </p>
              <p className="text-gray-700">
                Our commitment to innovation means we are always exploring new flavors and techniques to delight your
                taste buds. Most importantly, we are dedicated to providing exceptional customer service and creating a
                welcoming environment for all.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div>
                <h3 className="text-4xl font-bold mb-2">5.5 million</h3>
                <p className="text-gray-600">Customers in different regions</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2">24 billion</h3>
                <p className="text-gray-600">App Orders</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2">99%</h3>
                <p className="text-gray-600">Yearly value growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
