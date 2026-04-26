# Database Migrations

This directory is reserved for Alembic database migrations.

## Setup

When a persistent database backend is added (PostgreSQL, MySQL), initialize Alembic:

```bash
cd src/api
pip install alembic sqlalchemy
alembic init migrations
```

## Current State

The API currently reads from static JSON files in `/resources/`.
No database migrations are needed at this time.

When migrating to a relational database:
1. Define SQLAlchemy models in `app/models.py`
2. Create the initial migration: `alembic revision --autogenerate -m "initial"`
3. Apply: `alembic upgrade head`
