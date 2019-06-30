===================
Project Description
===================

- Site location: `<https://romelsantoral.pythonanywhere.com/>`_

**WorkOrder** is a site that gives an authenticated user the ability
to create work orders and assign a maximum of 5 workers on each it.
It also allows the user to filter it based on the assigned worker or
its deadline and manage the list of assigned workers. Finally,
by navigating the workers list page, the user will be able to
add or remove a worker.


==============
Project Setup
==============
- Create a virtual environment.
    ::

        $ virtualenv -p python3.7 3.7@workorder

- Activate the virtual environment after creating it.
    ::

        $ source 3.7@workorder/bin/activate

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

- Run the local server.
    ::

        $ python manage.py runserver

- Access the admin site using a browser `<http://127.0.0.1:8000/admin/sites/site/>`_ and login using the superuser account created earlier.
- Select the ``example.com`` record and replace its domain and display name with ``127.0.0.1:8000``.
- Go to `<http://127.0.0.1:8000/>`_ and test the site.
