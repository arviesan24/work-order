=================
Project Setup
=================
- Create a virtual environment.
    ::

        $ virtualenv -p python3.7 3.7@workorder

- Activate the virtual environment after creating it.
    ::

        $ source 3.7@workorder/bin/Activate

- Move inside the project's directory then install django and other required packages.
    ::

        $ cd workorder
        $ pip install -r requirements.txt

- Run migrations to generate the models in ``db.sqlite3`` file.
    ::

        $ python manage.py migrate

- Create a superuser to access the admin site and enter the ``username``, ``email`` and ``password`` for the account.
    ::

        $ python manage.py createsuperuser

- Create an environment file ``.env``.
    ::

        $ cat <<EOF > .env
        > DEBUG="true"
        > EOF

- Access the admin site using a browser `<http://127.0.0.1:8000/admin/sites/site/>`_ and login using the superuser account created earlier.
- Select the ``example.com`` record and replace it with ``127.0.0.1:8000``.
- Go to `<http://127.0.0.1:8000/>`_ and test the site.
