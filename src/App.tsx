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
import { useApp } from 'hooks/app.hook';
import { getRestTime } from 'utils/time';
import { Loader } from 'components/loader';
import { Header } from 'components/header';
import { Footer } from 'components/footer';


const ExchangeSelect = ({
  supportedCodes,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  supportedCodes: [string, string][];
}) => {
  return (
    <select {...props} className='bg-white py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm cursor-pointer focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none'>
      <option className='text-[#7A2180]'>Select an option</option>
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
    <ul className='flex flex-col'>
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
          className='flex flex-wrap gap-4 items-center [&:not(:first-child)]:py-3 [&:not(:last-child)]:py-3 [&:first-child]:pb-3 [&:last-child]:pt-3 md:flex-nowrap'
        >
          <div>
            <div className='w-8 h-8 bg-white border-2 border-[#7A2180] rounded-full grid place-content-center md:w-12 md:h-12'>
              <IconMoneybag color='#E40276' className='w-4 md:w-8' />
            </div>
          </div>
          <div className='w-4/5 md:w-full'>
            <h3 className='text-lg font-bold flex md:text-2xl'>
              <small className='font-normal flex items-center mr-1'>
                {item.amount.toLocaleString()} {item.base_code} ={' '}
              </small>
              {item.conversion_result.toLocaleString()} {item.target_code}
            </h3>
            <h4 className='flex text-xs items-center'>
              1 {item.base_code} <IconArrowNarrowRight size={12} />{' '}
              {item.conversion_rate} {item.target_code}
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
    <main className='h-dvh'>
      <Header/>
      <div className='container mx-auto flex flex-col justify-start gap-6 min-h-[calc(100dvh-452px)] px-4 py-10 lg:min-h-[calc(100%-409px)] md:px-20 lg:px-40 xl:px-80'>
        <h2 className='font-bold text-3xl tracking-tighter bg-gradient-to-r from-[#7A2180] to-[#E40276] bg-clip-text text-transparent uppercase'>Easy Currency Converter </h2>
        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-lg shadow-lg p-5 flex flex-col gap-3 relative'
        >
          <div className='flex flex-col gap-3 justify-center items-center md:flex-row'>
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
              className='p-2 bg-[#7A2180] text-white rounded-full shadow-md top-5'
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
          <div className='flex flex-col items-center gap-3'>
            <FormField
              className='w-full max-w-80'
              isError={!!(touched.amount && errors.amount)}
              error={errors.amount}
            >
              <input
                className='bg-white text-center py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none'
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
              className="p-[3px] relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#7A2180] to-[#E40276] rounded-lg" />
              <div className="px-8 py-2 text-[#030220] font-medium bg-white rounded-[6px]  relative group transition duration-200 hover:bg-transparent hover:text-white">
                {isLoading ? 'Converting' : 'Convert'}
              </div>
            </button>
          </div>
        </form>
        {result && (
          <div className='flex flex-col items-center bg-white shadow-lg p-5 rounded-lg'>
            <h3>
              {result.amount.toLocaleString()} {getCodeName(result.base_code)}{' '}
              {result.amount === 1 ? 'is' : 'are'}:
            </h3>
            <h4 className='text-4xl font-bold'>
              {result.conversion_result.toLocaleString()} {result.target_code}
            </h4>
            <small>
              Conversion rate: {result.conversion_rate}{' '}
              {result.target_code}
            </small>
          </div>
        )}
        {historyList.length > 0 && (
          <>
            <div className='mt-3 flex justify-between items-center'>
              <h3 className='font-bold text-xl bg-gradient-to-r from-[#7A2180] to-[#E40276] bg-clip-text text-transparent'>Conversion history</h3>
              <button
                className='bg-red-600 rounded-full p-2'
                onClick={onClearHistory}
              >
                <IconTrash color='white'/>
              </button>
            </div>
            <div className='bg-white shadow-lg p-5 rounded-lg max-h-80 overflow-auto'>
              <List historyList={historyList} />
            </div>
          </>
        )}
      </div>
      <Loader isLoading={isLoading} />
      <ToastContainer />
      <Footer />
    </main>
  );
}

export default App;
