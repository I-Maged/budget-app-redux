import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='flex'>
      Made By
      <a
        href='https://github.com/I-Maged'
        rel='noreferrer'
        target='_blank'
        className='githubLink flex'
      >
        Maged <FaGithub className='githubIcon' />
      </a>
    </footer>
  );
};

export default Footer;
