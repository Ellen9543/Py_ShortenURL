web: gunicorn config.wsgi:application
release: bash -c "python manage.py migrate && python manage.py collectstatic --noinput"