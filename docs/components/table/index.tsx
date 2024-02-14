import styled from '@emotion/styled';
import { Any } from 'docs/types';

const StyledTableWrapper = styled.div`
  mask-image: linear-gradient(
    to right,
    transparent 0.8em,
    white 1.5em,
    white calc(100% - 1.5em),
    transparent calc(100% - 0.8em)
  );

  &::-webkit-scrollbar {
    appearance: none;
  }
`;

export const OptionTable = ({ options }: { options: [string, string, Any] }) => {
  return (
    <StyledTableWrapper className="-mx-6 mb-4 mt-6 overflow-x-auto overscroll-x-contain px-6 pb-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b py-4 text-left dark:border-neutral-700">
            <th className="py-2 font-semibold">Option</th>
            <th className="py-2 pl-6 font-semibold">Type</th>
            <th className="px-6 py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody className="align-baseline text-gray-900 dark:text-gray-100">
          {options.map(([option, type, description]) => (
            <tr key={option} className="border-b border-gray-100 dark:border-neutral-700/50">
              <td className="whitespace-pre py-2 font-mono text-xs font-semibold leading-6 text-violet-600 dark:text-violet-500">
                {option}
              </td>
              <td className="whitespace-pre py-2 pl-6 font-mono text-xs font-semibold leading-6 text-slate-500 dark:text-slate-400">
                {type}
              </td>
              <td className="py-2 pl-6">{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableWrapper>
  );
};
