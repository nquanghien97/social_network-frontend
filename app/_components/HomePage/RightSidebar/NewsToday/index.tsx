import { useEffect, useState } from 'react';
import NewsTodayItem from './NewsTodayItem';
import GetNewsData from '@/services/new.services';
import LoadingIcon from '../../../../_assets/icons/LoadingIcon';
import NavLink from '../../../common/NavLink';

interface NewsData {
  title: string;
  pubDate: Date;
  link: string;
  article_id: string;
}

function NewsToday() {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(false);
  const sizeData = 3;

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await GetNewsData(sizeData);
        setNewsData(res.data.results);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="lg:py-4">
      <div>
        <h5 className="text-xl px-5 pt-5 font-extrabold">Today News</h5>
        <div className="px-5 pb-5">
          {loading ? (
            <div className="flex justify-center items-center">
              <LoadingIcon />
            </div>
          ) : (
            <div>
              {newsData.map((news) => (
                <NewsTodayItem key={news.article_id} title={news.title} time={news.pubDate} link={news.link} />
              ))}
            </div>
          )}
          <div className="mt-4 flex">
            <NavLink href="/" className="text-center px-3 py-2 rounded bg-[#0f6fec1a] hover:bg-[#326de4] duration-300 w-full">View More</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsToday;
