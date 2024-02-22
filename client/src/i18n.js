import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: 'false',
    },
    resources: {
      en: {
        translation: {
          userListPage: {
            success: 'Success',
            successMessageDelete: 'User successfully deleted!',
            successMessageUpdate: 'User successfully updated!',
            successMessageAdd: 'User successfully added!',
          },
          dataTable: {
            id: 'ID',
            name: 'Name',
            surname: 'Surname',
            email: 'E-mail',
            address: 'Address',
            jobTitle: 'Job Title',
            header: 'Users',
            footer1: 'In total there are ',
            footer2: ' users.',
            addButton: 'Add New',
            birthDate: 'Birth Date',
            gender: 'Gender',
            country: 'Country',
          },
          addUserForm: {
            title: 'User Form',
            name: 'Name',
            surname: 'Surname',
            email: 'E-mail',
            address: 'Address',
            jobTitle: 'Job Title',
            birthDate: 'Birth Date',
            submitButton: 'Submit',
            updateButton: 'Update',
            gender: 'Gender',
            country: 'Country',
            errors: {
              name: 'Username is required',
              surname: 'Surname is required',
              email: 'Email is required',
              emailFormat: 'Email format is not valid',
              address: 'Address is required',
              jobTitle: 'Job title is required',
              birthDate: 'Birth date is required',
              gender: 'Gender is required',
              country: 'Country is required',
            },
          },
        },
      },
      es: {
        translation: {
          userListPage: {
            success: 'Éxito',
            successMessageDelete: '¡Usuario eliminado exitosamente!',
            successMessageUpdate: '¡Usuario actualizado exitosamente!',
            successMessageAdd: '¡Usuario agregado con éxito!',
          },
          dataTable: {
            id: 'IDENTIFICACIÓN',
            name: 'Nombre',
            surname: 'Apellido',
            email: 'E-mail',
            address: 'Dirección',
            jobTitle: 'Título Profesional',
            header: 'Usuarios',
            footer1: 'En total hay ',
            footer2: ' usuarios.',
            addButton: 'Agregar Nuevo',
          },
          addUserForm: {
            title: 'Formulario de usuario',
            name: 'Nombre',
            surname: 'Apellido',
            email: 'E-mail',
            address: 'Dirección',
            jobTitle: 'Título Profesional',
            submitButton: 'Entregar',
            updateButton: 'Actualizar',
            errors: {
              name: 'Se requiere nombre de usuario',
              surname: 'Se requiere apellido',
              email: 'Se requiere correo electrónico',
              emailFormat: 'El formato del correo electrónico no es válido',
              address: 'Se requiere dirección',
              jobTitle: 'Se requiere el título del trabajo',
            },
          },
        },
      },
    },
  })
