import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@phosphor-icons/react';

const OptionCard = ({ icon: Icon, title, description, badge, to }) => {
  return (
    <Link
      to={to}
      className="card-inset relative flex flex-col justify-between rounded-2xl p-6 duration-150 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md group"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex size-12 items-center justify-center rounded-xl bg-tint-gray text-primary group-hover:bg-primary/10 duration-150">
            {Icon && <Icon size={24} weight="bold" />}
          </div>
          {badge && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {badge}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-lg font-bold text-black group-hover:text-primary duration-150">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-grey">{description}</p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
        <span>Go to Workspace</span>
        <ArrowRightIcon size={16} weight="bold" className="group-hover:translate-x-1 duration-150" />
      </div>
    </Link>
  );
};

export default OptionCard;
