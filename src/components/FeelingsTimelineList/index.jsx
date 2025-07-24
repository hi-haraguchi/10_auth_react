import React, { useState, useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Typography from '@mui/material/Typography';

const FeelingsTimelineList = () => {
  const [feelingsData, setFeelingsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // PHPスクリプトへのURL。ローカル環境での例。
        const response = await fetch('https://hh1000yvoyage.sakura.ne.jp/gs20250724auth_php_sakura/feelings_read.php', {
          method: 'GET', 
          credentials: 'include',
        });

        if (!response.ok) {
          // HTTPエラーの場合
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFeelingsData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 空の依存配列は、コンポーネントのマウント時に一度だけ実行されることを意味します

  if (loading) {
    return <div>Loading feelings data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Timeline position="right">
        {feelingsData.length > 0 ? (
          feelingsData.map((record) => (
            <TimelineItem key={record.id}> {/* 各アイテムに一意のkeyを与えることが重要 */}
              <TimelineOppositeContent color="text.secondary">
                {/* episode_numberとepisode_titleを左側に表示 */}
                <Typography variant="body2" component="span">
                  {record.episode_number}
                </Typography>
                <Typography variant="body2" component="span">
                  {record.episode_title}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                {/* commentsを右側に表示 */}
                <Typography variant="body1" color="text.primary">
                  {record.comments}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))
        ) : (
          <Typography>No feelings data found.</Typography>
        )}
      </Timeline>
    </div>
  );
};

export default FeelingsTimelineList;