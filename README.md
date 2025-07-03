# TODO

## Setup

- [ ] Intégrer MUI
  - [ ] CSS Baseline
  - [ ] Icons
  - [ ] Theme
- [ ] Intégrer React Router
  - [ ] Version 6
  - [ ] Mode Data
- [ ] Intégrer React Query
- [ ] Intégrer React Hook Form

## Sujet

Créer une application de type Compteur permettant de gérer un état simple (entier) coté serveur par utilisateur et en temps réel.

- Chaque utilisateur gère son unique compteur et peut l'incrémenter ou le décrémenter
- Si l'utilisateur n'est pas connecté, il ne peut pas accéder à l'application (Login)
- (Optionnel) L'application doit être responsive et s'adapter à tous les écrans
- Layouts :
  - Blank (pour la page de login)
  - Main (pour le reste des pages)
- Pages :
  - Login (`/login`) :
    - page par défaut si l'utilisateur n'est pas connecté
    - doit permettre de s'inscrire
      - email
      - mot de passe
      - nom
      - prénom
    - doit permettre de se connecter
      - email
      - mot de passe
    - doit rediriger vers la page d'accueil si l'utilisateur est connecté
    - doit afficher un message d'erreur générique si :
      - l'utilisateur n'est pas trouvé
      - ou si le mot de passe est incorrect
  - Accueil `/` :
    - page par défaut si l'utilisateur est connecté
    - doit afficher le compteur et deux boutons pour incrémenter et décrémenter
    - doit afficher le nom de l'utilisateur connecté
    - doit afficher le top 3 des utilisateurs avec leur compteur
  - Compteurs `/counters` :
    - doit afficher la liste des utilisateurs et leur compteur (par ordre décroissant)
    - (Optionnel) doit afficher le total des compteurs cumulés
    - (Optionnel) doit permettre de rechercher un utilisateur par son nom, prénom ou email
- Header :
  - doit afficher le nom de l'application
  - doit afficher un avatar contenant les initiales de l'utilisateur connecté
  - doit permettre de se déconnecter
- Footer :
  - doit afficher le nom de l'application
  - doit afficher le copyright
  - doit afficher l'année en cours


## Wireframe

+-------------------------------+
| APP_NAME      NAV           O |  <- Header
+-------------------------------+
|                | TOP 3        |
|                | #1 Name   21 |
|     - 21 +     | #2 Name    9 |
|                | #3 Name    3 |  <- Page content
|                |              |
|                |              |
+-------------------------------+
|           © copyright         |  <- Footer
+-------------------------------+
