import datetime
from sqlalchemy.orm import Session
from sqlalchemy import select
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from core.db import engine
from models.db import Sessions

def setup():
    scheduler = BackgroundScheduler()
    scheduler.add_job(main, CronTrigger.from_crontab('0 0 * * *'))
    scheduler.start()
    
def main():
    # cleans up sessions that weren't accessed for over 30 days
    boundary = datetime.date.today() - datetime.timedelta(30)
    with Session(engine) as session:
        stmt = select(Sessions).where(Sessions.last_access < boundary)
        sessions = session.scalars(stmt)
        for s in sessions:
            session.delete(s)
        session.commit()
        