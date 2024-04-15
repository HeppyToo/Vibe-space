import Image from 'next/image';
import auth_logo from '../../../public/anime-characters.png';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex xl:flex-row flex-col-reverse">
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        {children}
      </section>

      <Image
        src={auth_logo}
        alt="logo"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
    </div>
  );
};

export default AuthLayout;
