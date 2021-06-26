import {
  GitHub,
  Mail,
  Linkedin,
} from 'react-feather';

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center py-4 text-sm font-medium shadow-innerlight dark:shadow-innerdark">
      <p>Created By Mohammad Afandy</p>
      <p>Data Provided By <a className="underline" href="https://data.covid19.go.id/public/index.html">(Data COVID19 Public)</a></p>
      <div className="flex mt-1">
        <a className="mr-3" href="https://github.com/mohammadafandy" target="_blank" rel="noreferrer">
          <GitHub />
        </a>
        <a className="mr-3" href="mailto:afandy9895@gmail.com">
          <Mail />
        </a>
        <a href="https://linkedin.com/in/mohammad-afandy-28700b137" target="_blank" rel="noreferrer">
          <Linkedin />
        </a>
      </div>
    </div>
  )
}

export default Footer
