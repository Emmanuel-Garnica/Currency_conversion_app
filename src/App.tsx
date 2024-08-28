import { memo, SelectHTMLAttributes } from 'react';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import {
  IconArrowNarrowRight,
  IconMoneybag,
  IconSwitchHorizontal,
  IconTrash,
} from '@tabler/icons-react';
import { FormField } from 'components/form-field';
import { History } from 'store/history.state';
import { Loader } from 'components/loader';
import { useApp } from 'hooks/app.hook';
import { getRestTime } from 'utils/time';

const ExchangeSelect = ({
  supportedCodes,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  supportedCodes: [string, string][];
}) => {
  return (
    <select {...props}>
      <option>Select an option</option>
      {supportedCodes.map(([supportedCode, name]) => (
        <option key={supportedCode} value={supportedCode}>
          {supportedCode} - {name}
        </option>
      ))}
    </select>
  );
};

const List = memo(({ historyList }: { historyList: History[] }) => {
  return (
    <ul className='flex flex-col divide-y divide-zinc-950'>
      {historyList.map((item, idx) => (
        <motion.li
          key={`${item.target_code}-${item.search_date}`}
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              delay: 0.11 * idx,
            },
          }}
          className='flex gap-4 items-center [&:not(:first-child)]:py-3 [&:not(:last-child)]:py-3 [&:first-child]:pb-3 [&:last-child]:pt-3'
        >
          <div>
            <div className='w-12 h-12 bg-zinc-500 rounded-full grid place-content-center'>
              <IconMoneybag size={32} />
            </div>
          </div>
          <div className='w-full'>
            <h3 className='text-2xl font-bold flex'>
              <small className='font-normal flex items-center mr-1'>
                {item.amount.toLocaleString()} {item.base_code} ={' '}
              </small>
              {item.conversion_result.toLocaleString()} {item.target_code}
            </h3>
            <h4 className='flex text-xs items-center'>
              1 {item.base_code} <IconArrowNarrowRight size={12} />{' '}
              {item.conversion_rate.toLocaleString()} {item.target_code}
            </h4>
          </div>
          <div className='mb-auto'>
            <p className='text-xs opacity-50 text-right whitespace-nowrap'>
              {getRestTime(item.search_date)}
            </p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
});

function App() {
  const {
    result,
    values,
    errors,
    touched,
    historyList,
    supportedCodes,
    isLoading,
    switchCurrencies,
    getCodeName,
    onClearHistory,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useApp();

  return (
    <main className='h-dvh w-full grid place-content-center gap-6'>
      <form
        onSubmit={handleSubmit}
        className='bg-zinc-900 rounded-lg shadow-lg p-5 grid gap-3 relative'
      >
        <div className='flex gap-3 items-center'>
          <FormField
            isError={!!(touched.base && errors.base)}
            error={errors.base}
          >
            <ExchangeSelect
              name='base'
              value={values.base}
              onChange={handleChange}
              onBlur={handleBlur}
              supportedCodes={supportedCodes}
            />
          </FormField>
          <motion.button
            whileTap={{
              scale: 0.9,
              rotate: 180,
            }}
            type='button'
            className='p-2 bg-zinc-700 rounded-full shadow-md top-5'
            onClick={switchCurrencies}
          >
            <IconSwitchHorizontal />
          </motion.button>
          <FormField
            isError={!!(touched.target && errors.target)}
            error={errors.target}
          >
            <ExchangeSelect
              name='target'
              value={values.target}
              onChange={handleChange}
              onBlur={handleBlur}
              supportedCodes={supportedCodes}
            />
          </FormField>
        </div>
        <div className='flex col-span-2 gap-3'>
          <FormField
            className='w-full'
            isError={!!(touched.amount && errors.amount)}
            error={errors.amount}
          >
            <input
              className='w-full'
              type='number'
              name='amount'
              placeholder='Write an amount'
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormField>
          <button
            disabled={isLoading}
            type='submit'
            className='bg-black disabled:opacity-60 px-2'
          >
            {isLoading ? 'Converting' : 'Convert'}
          </button>
        </div>
      </form>
      {result && (
        <div className='bg-zinc-900 shadow-lg p-5 rounded-lg'>
          <h3>
            {result.amount.toLocaleString()} {getCodeName(result.base_code)}{' '}
            {result.amount === 1 ? 'is' : 'are'}:
          </h3>
          <h4 className='text-4xl font-bold'>
            {result.conversion_result.toLocaleString()} {result.target_code}
          </h4>
          <small>
            Conversion rate: {result.conversion_rate.toLocaleString()}{' '}
            {result.target_code}
          </small>
        </div>
      )}
      {historyList.length > 0 && (
        <>
          <div className='mt-3 flex justify-between items-center'>
            <h2 className='font-bold text-xl'>Conversion history</h2>
            <button
              className='bg-red-950 rounded-full p-2'
              onClick={onClearHistory}
            >
              <IconTrash />
            </button>
          </div>
          <div className='bg-zinc-900 shadow-lg p-5 rounded-lg max-h-96 overflow-auto'>
            <List historyList={historyList} />
          </div>
        </>
      )}
      <Loader isLoading={isLoading} />
      <ToastContainer />
    </main>
  );
}

export default App;
