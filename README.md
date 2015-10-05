# Introduction

WampiGraph est le pendant numerique de l'oeuvre Wampicôn du collège Jean Moulin d’Aubervilliers

WampiGraph est une application composé de deux modules :

* Un site de creation et de moderation des Wampums
* Une application "bureau" permettant la visualisation de la "rivière" de Wampums

Nous parlerons ici du site. Pour la rivière, voir [Wampigraph App](https://github.com/mrpierrot/wampigraph-app)

# Avant-Propos Technique

WampiGraph mets en place un processus de developpement avancés qui peuvent paraitre compliqué au premier abord. De même, il utilise certains frameworks facilitant la tache de developpeur.
Le pendant est que la prise en main pour un novice peut etre compliqué. La section qui suit à pour but de détaillés les technologies utilisent sur ce projet

# Les technologies de bases

WampiGraph utilise les technologies suivantes :

* Un serveur Apache : qui est le serveur logiciel ( à ne pas confondre avec le serveur materiel, qui est une machine )
  Voir [sur Wikipedia](http://fr.wikipedia.org/wiki/Apache_HTTP_Server)
  C'est le socle de notre site web
* PHP 5.5 : qui est le langage serveur utilisé sur notre serveur apache pour concevoir toute le rendu des pages web, gerer les droits utilisateurs, sauver en base de données, etc...
* MySQL : la base de donnée, car il faut bien stocker quelque part tout les utilisateurs, wampums, etc...
* HTML/CSS : car avoir un truc un peu jolie qui s'affiche dans son navigateur c'est mieux
* Javascript (JS) : Pour concevoir toutes les actions possibles faites coté client ( dans le navigateur )

# Les outils

Le developpeur est un feignant. C'est pourquoi depuis des années, il s'est éfforcé à créer des outils des outils pour lui faciliter la tache, pour ne pas avoir à faire 100 fois les mêmes choses,
pour pouvoir se concentrer sur, ce qu'il aime, travailler sur le coeur de l'application qu'il doit concevoir.
Ces outils, il en existe une miriade. Quelques'un ont été selectionnés pour créé se projet.
Frameworks, Bibliotheques, Package Managers, Pre-processeurs, Automatiseur de Tâches, etc... Voilà plusieurs type d'outils qui sont utilisés sur ce projet.

Alors, je ne cache pas qu'apprendre à connaitre ses differents outils prends du temps. Mais une fois fait, le gain de temps est rapidement rattrapés.

## Les frameworks et bibilotheques ( en anglais dans le texte )

Une bibilotheque est un ensemble de fonction déjà codé servant à faciliter la vie

Un framework est une sorte de super bibilotheque, voir un ensemble de bibilotheques, qui souvent permettent d'autres choses comme mieux structurer son code

Et des frameworks et des bibilotheques, on va en utiliser un bon paquet sur WampiGraph.

### Les frameworks

#### Silex

[Silex](http://silex.sensiolabs.org/) est un petit framework [MVC](http://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur) pour PHP basé sur Synfony, un autre gros framework qui va permettre de bien structurer le code PHP,
tout en fournissant des outils facile à mettre place pour gerer en autre : les comptes utilisateurs, les formulaires et plein d'autres choses

Silex est le framework PHP qui va servir de base à notre application coté serveur

#### AngularJS

[AngularJS](https://angularjs.org/) est un framework [MVC](http://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur) pour Javascript.
C'est la pierre angulaire ( sans mauvais jeu de mots ) de notre application, coté navigateur


### Les bibliotheques

#### Bootstrap

[Bootstrap](http://getbootstrap.com/) est un bibliotheque JS developpé par Twitter permettant de créer rapidement des composants HTML avancés.
On peut voir [ici](http://getbootstrap.com/components/) les possibilités de la chose

#### JQuery

[JQuery](http://jquery.com/) est une bibliotheque JS permettant de manipuler simplements les elements d'une page HTML et celà quelque soit le navigateur utilisé.
C'est un complement à angular pour tout ce qui tient de l'animation

### RequireJS

[RequireJS](http://requirejs.org/) est une bibliotheque JS qui facilitent les chargements des autres composants,frameworks et bibliotheque de l'application

## Les package managers

La liste des outils ci dessus n'est pas exhaustive. ça en fait déjà pas mal. Il faut pouvoir mettre les choses au bon endroit. Et surtout touts ceci ne fait pas parti du coeur de notre application.
Ce sont juste des outils sur lesquel se base WampiGraph. Pour gerer tout ça bien comme il faut, nous avons un outil qui fait le taf : le package manager

Le package manager est un outil qui va aller chercher sur internet les differents outils que nous voulont utiliser pour les placer directement dans notre projet.
Celà évite la tache fastidieuse d'aller chercher les differents elements à droite à gauche tout en garantissant une certaine intégrité et une certaine cohésion de l'ensemble des outils.

WampiGraph utilise trois packages managers. Oui ça fait beaucoup. Il y a des raisons pour celà. Et je vais y venir.

### Composer

[Composer](https://getcomposer.org/) est un package manager pour PHP, c'est avec lui que nous allons recuperer Silex et tout les autres modules rattachés à Silex dont nous avons besoin
Voir [composer.json](composer.json)

### Bower

[Bower](http://bower.io/) fait la même chose mais pour JS. C'est donc lui qui va aller chercher les derieres versions d'AngularJS, Bootstrap, JQuery, etc....
Voir [bower.json](bower.json)

### NPM

[NPM](https://www.npmjs.org/) qu'est ce qu'il fait là? Et bien NPM est un Package Manager pour [NodeJS](http://nodejs.org/). Que fait NodeJS ici?
Et bien NodeJS est la base pour un paquet d'outils utilisés dans notre projet. Il est notament necessaire à l'installation de Bower, Grunt et LESS ( nous verrons plus loins à quoi sert ces deux derniers )
Voir [package.json](package.json)


## LESS

[LESS](http://lesscss.org/) est un outil facilitant l'écriture de CSS. CSS en tant que language peut etre assez limité. Et pour peu qu'on est des tonnes et des tonnes feuilles de styles à écrire,
ça peut rapidement devenir le bazard. LESS permet de mieux organiser ses CSS et de factoriser du code.


## Grunt

[Grunt](http://gruntjs.com/) est un automatiseur de taches.

Dans un projet web, il y a beaucoup de taches qui peuvent etre rapidement repetitives et fastidieuses. Differencier une version de l'application en production à une version en developpement.
Deplacer, compiler des fichiers. Les taches sont multiples. Grunt est un outil écrit en JS pour automatiser tout ça.

# Installation

Pour fonctionner, WampiGraph necessite plusieurs programmes dis d'environnement qui ne sont à installer qu'une fois sur votre machine.
La rubrique ci dessous les listes

## Les programmes d'environement

### Installer Apache avec PHP et MYSQL

Si vous êtes sous Windows, vous pouvez installer simplement les 3 d'un coup avec [WAMP](http://www.wampserver.com/)
L'installation ne necessitant qu'a télécharger et executer un .exe, je ne vais pas rentrer ici dans les détails. Pour toutes infos, veuillez aller sur le [site officiel](http://www.wampserver.com/).

### Installer NodeJS

[NodeJS](http://nodejs.org/) est la base pour beaucoup d'outils de developpement. L'installation est aussi assez facile et consiste à télécharger un .exe. Voir plus d'infos sur le [site officiel](http://nodejs.org/)

### Installer LESS, Bower et Grunt

Ces trois outils sont basé sur [NodeJS](http://nodejs.org/).
Veuillez d'abord ouvrir un terminal ( sous Windows : Demarrer/et saisir cmd.exe dans le champ de recherche )

Puis vérifiez que NodeJS est bien installer en tapant :

    node -v

Si vous avez autre chose que

    'node -v' n'est pas reconnu en tant que commande interne
    ou externe, un programme exécutable ou un fichier de commandes.

C'est bon.

On va ensuite installer LESS la commande suivante dans le terminal :

    npm install -g less


Simple, non?
Une fois celle ci, terminé, on passe à Bower avec :

    npm install -g bower

Pour finir, on saisi :

    npm install -g grunt

Et voilà, pour ces 3 là.


### Composer

Pour [Composer](https://getcomposer.org/doc/00-intro.md#installation-windows), si vous êtes sous windows encore une fois, il faut télécharger le logiciel [ici](https://getcomposer.org/Composer-Setup.exe)
On l'execute pour l'ancer l'installation.
Attention, composer va vous demander ou se trouve la version de PHP que vous utilisez. Si vous avez fait votre installation de WAMP sans changer les parametres par défaut, il devrait se trouver ici :

    C:\wamp\bin\php\php5.5.12\php.exe

/!\ il se peut que php soit à une version superieur à php5.5.12, il faut modifier le chemin avec la bonne version


## Installation de WampiGraph

### prerequis

Pour la suite de l'installation, on va partir du principe que vous avez placer le projet dans **C:/WampiGraph**.
Ce n'est pas forcement le meilleur emplacement, et vous pouvez le changer à loisir. Seulement, avoir un exemple va nous impliez la vie

Pour la suite de l'installation, vous devez ouvrir un terminal ( sous Windows : Demarrer/et saisir cmd.exe dans le champ de recherche )

Et vous placer à la racine du projet, donc **C:/WampiGraph**

### Recuperation des sources 

#### Via Git

    git clone https://github.com/mrpierrot/wampigraph-site.git

#### Via un .zip

[Télécharger le zip sur Github](https://github.com/mrpierrot/wampigraph-site/archive/master.zip)

### Recuperation des packages

#### Installation des packages PHP avec composer

Si vous avez un terminal ouvert à la racine de votre projet (**C:/WampiGraph**), saisissez la commande suivante

    composer self-update & composer install

Cette commande va recuperer Silex, et les autres bibliotheques pour PHP

#### Installation des packages JS avec Bower

Si vous avez un terminal ouvert à la racine de votre projet (**C:/WampiGraph**), saisissez la commande suivante

    bower install

Cette commande va recuperer AngularJS, et les autres bibliotheques pour JS

#### Installation des packages NodeJS pour Grunt

Si vous avez un terminal ouvert à la racine de votre projet (**C:/WampiGraph**), saisissez la commande suivante

    npm install

Cette commande va recuperer les elements necessaires au bon fonctionnement de Grunt

#### Installation de la base de donnée. 

Importez la base de donnée suivante : 

    /resources/db/wampigraph.sql

### Configuration 

La configuration du site en production est disponible ici :

    /resources/config/prod.php

La configuration du site en developpement est disponible ici :

    /resources/config/dev.php

/!\ Il faut modifier la conf de la base de donnée MySQL (au moins pour la production, qui est vierge)

    $app['db.options'] = array(
        'driver'   => 'pdo_mysql',
        'unix_socket'     => '/srv/run/mysqld/mysqld.sock',
        'dbname'   => 'wampigraph',
        'user'     => 'root',
        'password' => '',
        'charset'  => 'utf8'
    );

Et mail : 

    $app['swiftmailer.options'] = array(
        'host' => '',
        'port'=> '465',
        'username' => '',
        'password' => '',
        'encryption' => 'ssl',
        'auth_mode' => null

    );

### IMPORTANT : Travailler avec Grunt

Avant de modifier le code de WampiGraph, veuillez saisir la commande suivante dans le terminal :

    grunt watch

/!\ Ne fermez pas le terminal, tant que *grunt watch* est executé, celà l'arreterait tout simplement
Que fait cette commande? Et ça lance, un petit programme qui surveille les fichiers de "resources/web" pour mettre à jour au besoin "web/assets"
Mais nous verront plus bas que sont ces chemins










